package controllers

import play.api._
import play.api.mvc._
import play.api.libs.json.Json
import models._
import dal._

import scala.concurrent.{ ExecutionContext, Future }

import javax.inject._

class UserController @Inject() (userRepo: UserRepository)
                               (implicit ec: ExecutionContext) extends Controller{
  /**
   * The index action.
   */
  def index = Action {
    Ok(views.html.index())
  }

  def getById(id : Long) = Action.async {
    userRepo.findById(id).map { user =>
      Ok(Json.toJson(user))
    }
  }
}
