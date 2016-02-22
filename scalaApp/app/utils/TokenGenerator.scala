package utils

object TokenGenerator {
  def generate = java.util.UUID.randomUUID.toString
}
