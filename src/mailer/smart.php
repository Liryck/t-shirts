<?php 

$name = $_POST['name'];
$phone = $_POST['phone'];
$title = $_POST['title'];

require_once('phpmailer/PHPMailerAutoload.php');
$mail = new PHPMailer;
$mail->CharSet = 'utf-8';

// $mail->SMTPDebug = 3;                               // Enable verbose debug output

$mail->isSMTP();                                      // Set mailer to use SMTP
$mail->Host = 'mail.kramnytsya.com.ua';  // Specify main and backup SMTP servers
$mail->SMTPAuth = true;                               // Enable SMTP authentication
$mail->Username = 'order@kramnytsya.com.ua';                 // Наш логин
$mail->Password = '2vl;cwC{kP)3';                           // Наш пароль от ящика
$mail->SMTPSecure = 'ssl';                            // Enable TLS encryption, `ssl` also accepted
$mail->Port = 465;                                    // TCP port to connect to
 
$mail->setFrom('order@kramnytsya.com.ua', 'Kramnytsya');   // От кого письмо 
$mail->addAddress('liryckbragin@gmail.com');     // Add a recipient
//$mail->addAddress('ellen@example.com');               // Name is optional
//$mail->addReplyTo('info@example.com', 'Information');
//$mail->addCC('cc@example.com');
//$mail->addBCC('bcc@example.com');
//$mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
//$mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name
$mail->isHTML(true);                                  // Set email format to HTML

$mail->Subject = 'Замовлення';
$mail->Body    = '
		Нове замовлення <br> 
	Імя: ' . $name . ' <br>
	Номер телефону: ' . $phone . '
	Замовлення: ' . $title . '';
	

if(!$mail->send()) {
    return false;
} else {
    return true;
}

?>