variable "vpcname" {
  type = string
  default = "myvpc"
}

variable "sshport" {
  type = number
  default = 22
}

variable "enabled" {
  default = true
}

variable "mylist" {
  type = list(string)
  default = ["Value1", "Value2"]
}

variable "mymap" {
  type = map
  default = {
    Key1 = "Value1"
    Key2 = "Value2"
  }
}