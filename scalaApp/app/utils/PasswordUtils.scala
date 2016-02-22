package utils

object PasswordUtils {
  def hash(password : String) : String = {
    val md = java.security.MessageDigest.getInstance("SHA-1")

    md.digest(password.getBytes("UTF-8")).map("%02x".format(_)).mkString
  }
}
