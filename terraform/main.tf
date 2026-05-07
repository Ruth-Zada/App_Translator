resource "kubernetes_namespace" "app_ns" {
  metadata {
    name = var.namespace_name
  }
}

resource "helm_release" "backend_app" {
  name       = var.release_name
  chart      = var.chart_path
  namespace  = kubernetes_namespace.app_ns.metadata[0].name

  # וודא שהפודים לא נתקעים ב-Wait אם יש בעיית Image
  wait = false

  depends_on = [kubernetes_namespace.app_ns]
}