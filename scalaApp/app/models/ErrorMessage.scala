package models

import play.api.libs.json._

case class ErrorMessage(code : Int, message : String)

object ErrorMessage {
  implicit val errorMessageFormat = Json.format[ErrorMessage]
}
