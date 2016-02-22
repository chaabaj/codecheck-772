package controllers

import play.api._
import play.api.mvc._
import play.api.libs.json.Json
import play.api.data._
import play.api.data.Forms._
import play.api.data.validation.Constraints._
import play.api.Logger
import models._
import dal._
import utils._

import scala.concurrent.{ ExecutionContext, Future }

import javax.inject._

class LoginController @Inject() (userRepo: UserRepository)
                                (implicit ec: ExecutionContext) extends Controller{

  case class LoginData(email : String, password : String)

  private val loginForm = Form(mapping(
                                  "email" -> email,
                                  "password" -> text.verifying(nonEmpty)
                                )(LoginData.apply)(LoginData.unapply))

  /**
   * Login user
   */
  def login = Action.async { implicit request =>
    Logger.info("Received login request")
    loginForm.bindFromRequest.fold(
        formWithErrors => {
          Logger.error("Error in the form")
          FutureHelper.immediateResult(BadRequest(Json.obj(
            "code" -> 500,
            "message" -> "Form errors"
          )))
        },
        loginData => {
          val hashPassword = PasswordUtils.hash(loginData.password)

          userRepo.findByEmailAndPassword(loginData.email, hashPassword).map { someUser =>
            someUser match {
              case Some(user : User) => {
                val token = TokenGenerator.generate

                Logger.info("Found user")
                userRepo.registerAuthUser(token, user)
                Ok(Json.obj(
                  "code" -> 200,
                  "token" -> token,
                  "user" -> Json.obj(
                    "id" -> user.id,
                    "name" -> user.name,
                    "group_id" -> user.groupId
                  )
                ))
              }
              case None =>
                Logger.info("Cannot found the user")
                Ok(Json.toJson(ErrorMessage(500, "Cannot find user")))
            }
          }
        }
    )
  }
}
