variable "namespace_name" {
  description = "The name of the namespace for our application"
  type        = string
  default     = "translator-prod"
}

variable "release_name" {
  description = "The helm release name"
  type        = string
  default     = "my-backend"
}

variable "chart_path" {
  description = "Path to the local helm chart"
  type        = string
  default     = "../helm/app-translator"
}