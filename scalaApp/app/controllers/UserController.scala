package controllers

import play.api._
import play.api.mvc._
import play.api.i18n._
import play.api.data.Form
import play.api.data.Forms._
import play.api.data.validation.Constraints._
import play.api.libs.json.Json
import models._
import dal._

import scala.concurrent.{ ExecutionContext, Future }

import javax.inject._

class UserController @Inject() (repo: UserRepository)
                               (implicit ec: ExecutionContext) extends Controller{


  /**
   * The index action.
   */
  def index = Action {
    Ok(views.html.index())
  }
}
