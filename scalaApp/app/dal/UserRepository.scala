package dal

import javax.inject.{ Inject, Singleton }
import play.api.db.slick.DatabaseConfigProvider
import slick.driver.JdbcProfile

import models.User

import scala.concurrent.{ Future, ExecutionContext }

/**
 * A repository for people.
 *
 * @param dbConfigProvider The Play db config provider. Play will inject this for you.
 */
@Singleton
class UserRepository @Inject() (dbConfigProvider: DatabaseConfigProvider)(implicit ec: ExecutionContext) {
  // We want the JdbcProfile for this provider
  private val dbConfig = dbConfigProvider.get[JdbcProfile]
  private var authenticatedUsers = scala.collection.mutable.Map[String, Long]()

  // These imports are important, the first one brings db into scope, which will let you do the actual db operations.
  // The second one brings the Slick DSL into scope, which lets you define the table and other queries.
  import dbConfig._
  import driver.api._

  /**
   * Here we define the table. It will have a name of people
   */
  private class UserTable(tag: Tag) extends Table[User](tag, "users") {

    def id = column[Long]("id", O.PrimaryKey, O.AutoInc)
    def name = column[String]("name")
    def password = column[String]("password")
    def email = column[String]("email")
    def groupId = column[Int]("group_id")


    /**
     * This is the tables default "projection".
     *
     * It defines how the columns are converted to and from the Person object.
     *
     * In this case, we are simply passing the id, name and page parameters to the Person case classes
     * apply and unapply methods.
     */
    def * = (id, name, password, email, groupId) <> ((User.apply _).tupled, User.unapply)
  }


  private val users = TableQuery[UserTable]

  /**
   * Register new authenticated user
   */
  def registerAuthUser(token : String, user : User) = {
    authenticatedUsers(token) = user.id
  }

  /**
   * Check if an user is authenticated
   */
  def isAuthenticated(token : String) : Boolean  = {
    authenticatedUsers.contains(token)
  }

  /**
   * Find user by id
   */
  def findById(id : Long) : Future[Option[User]] = db.run {
    users.filter(_.id === id).result.headOption
  }

  /**
   * Find user by email and password
   */
  def findByEmailAndPassword(email : String, password : String) : Future[Option[User]] = db.run {
    users.filter(user => user.email === email && user.password === password).result.headOption
  }
}
