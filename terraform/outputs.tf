output "namespace_created" {
  value = kubernetes_namespace.app_ns.metadata[0].name
}

output "helm_release_status" {
  value = helm_release.backend_app.status
}