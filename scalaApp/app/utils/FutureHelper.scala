package utils

import scala.concurrent._

object FutureHelper {
  def immediateResult[T](value : T) = {
    Promise.successful(value).future
  }
}
