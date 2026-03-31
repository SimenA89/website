param(
  [int]$Port = 5173
)

$root = Get-Location

$listener = [System.Net.HttpListener]::new()
$listener.Prefixes.Add("http://localhost:$Port/")
$listener.Start()

Write-Output "Listening on http://localhost:$Port/"

$mime = @{
  ".html" = "text/html; charset=utf-8"
  ".css"  = "text/css; charset=utf-8"
  ".js"   = "application/javascript; charset=utf-8"
  ".png"  = "image/png"
  ".jpg"  = "image/jpeg"
  ".jpeg" = "image/jpeg"
  ".svg"  = "image/svg+xml"
  ".ico"  = "image/x-icon"
  ".webp" = "image/webp"
}

while ($listener.IsListening) {
  $context = $listener.GetContext()
  $req = $context.Request
  $res = $context.Response

  $path = $req.Url.AbsolutePath.TrimStart('/')
  if ([string]::IsNullOrWhiteSpace($path)) {
    $path = "index.html"
  }

  $file = Join-Path $root $path
  if (Test-Path $file -PathType Leaf) {
    $ext = [System.IO.Path]::GetExtension($file).ToLowerInvariant()
    if ($mime.ContainsKey($ext)) {
      $res.ContentType = $mime[$ext]
    } else {
      $res.ContentType = "application/octet-stream"
    }

    $bytes = [System.IO.File]::ReadAllBytes($file)
    $res.StatusCode = 200
    $res.OutputStream.Write($bytes, 0, $bytes.Length)
  } else {
    $msg = [System.Text.Encoding]::UTF8.GetBytes("Not found")
    $res.StatusCode = 404
    $res.ContentType = "text/plain; charset=utf-8"
    $res.OutputStream.Write($msg, 0, $msg.Length)
  }

  $res.Close()
}

