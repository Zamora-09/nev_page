<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
// Configuración de seguridad y headers
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Solo permitir método POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Método no permitido']);
    exit;
}

// Obtener datos del formulario
$input = json_decode(file_get_contents('php://input'), true);

// Validar que se recibieron datos
if (!$input) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'No se recibieron datos']);
    exit;
}

// Extraer y validar campos
$nombre = trim($input['nombre'] ?? '');
$email = trim($input['email'] ?? '');
$telefono = trim($input['telefono'] ?? '');
$mensaje = trim($input['mensaje'] ?? '');

// Validaciones
$errors = [];

if (empty($nombre)) {
    $errors[] = 'El nombre es requerido';
}

if (empty($email)) {
    $errors[] = 'El email es requerido';
} elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = 'El email no es válido';
}

if (empty($telefono)) {
    $errors[] = 'El teléfono es requerido';
}

if (empty($mensaje)) {
    $errors[] = 'El mensaje es requerido';
}

// Si hay errores, retornarlos
if (!empty($errors)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Errores de validación', 'errors' => $errors]);
    exit;
}

// Protección anti-spam básica
if (strlen($mensaje) > 2000) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'El mensaje es demasiado largo']);
    exit;
}

// Configuración del email (CAMBIAR AQUÍ)
$to_email = 'pilarzamora09@gmail.com'; // Cambiar por el email final
$to_name = 'NEV - Nueva Era Vehicular';
$subject = 'Nuevo mensaje de contacto - NEV Website';

// Crear el contenido del email
$email_content = "
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #2c3e50; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; background: #f9f9f9; }
        .field { margin-bottom: 15px; }
        .label { font-weight: bold; color: #2c3e50; }
        .value { margin-top: 5px; }
        .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
    </style>
</head>
<body>
    <div class='container'>
        <div class='header'>
            <h2>Nuevo Mensaje de Contacto</h2>
            <p>NEV - Nueva Era Vehicular</p>
        </div>
        <div class='content'>
            <div class='field'>
                <div class='label'>Nombre:</div>
                <div class='value'>" . htmlspecialchars($nombre) . "</div>
            </div>
            <div class='field'>
                <div class='label'>Email:</div>
                <div class='value'>" . htmlspecialchars($email) . "</div>
            </div>
            <div class='field'>
                <div class='label'>Teléfono:</div>
                <div class='value'>" . htmlspecialchars($telefono) . "</div>
            </div>
            <div class='field'>
                <div class='label'>Mensaje:</div>
                <div class='value'>" . nl2br(htmlspecialchars($mensaje)) . "</div>
            </div>
        </div>
        <div class='footer'>
            <p>Este mensaje fue enviado desde el formulario de contacto de NEV Website</p>
            <p>Fecha: " . date('d/m/Y H:i:s') . "</p>
        </div>
    </div>
</body>
</html>
";

// Versión texto plano para compatibilidad
$email_text = "
Nuevo Mensaje de Contacto - NEV Website

Nombre: $nombre
Email: $email
Teléfono: $telefono
Mensaje: $mensaje

Fecha: " . date('d/m/Y H:i:s') . "
";

try {
    // Usar mail() nativo (más simple, funciona en cualquier hosting)
    $headers = array(
        'MIME-Version: 1.0',
        'Content-type: text/html; charset=UTF-8',
        'From: NEV Website <noreply@nev-electric.com>',
        'Reply-To: ' . $email,
        'X-Mailer: PHP/' . phpversion()
    );
    
    if (!mail($to_email, $subject, $email_content, implode("\r\n", $headers))) {
        throw new Exception('Error al enviar email');
    }
    
    // Respuesta exitosa
    echo json_encode([
        'success' => true, 
        'message' => '¡Gracias por tu mensaje! Te contactaremos pronto.'
    ]);
    
} catch (Exception $e) {
    // Log del error
    error_log('Error en formulario de contacto: ' . $e->getMessage());
    
    http_response_code(500);
    echo json_encode([
        'success' => false, 
        'message' => 'Lo sentimos, hubo un error al enviar el mensaje. Por favor, intenta nuevamente.'
    ]);
}
?> 