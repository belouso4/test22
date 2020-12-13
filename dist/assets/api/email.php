<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';


$mail = new PHPMailer(true);

$mail->isSMTP();

$mail->Host = "smtp.mail.ru";
$mail->SMTPAuth   = true;

$mail->Username   = 'kirill.belousov15151515@gmail.com';
$mail->Password   = '3792016zxcsdfert';
$mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;         // Enable TLS encryption; `PHPMailer::ENCRYPTION_SMTPS` encouraged
$mail->Port       = 587;
$mail->setFrom('kirill.belousov15151515@gmail.com', 'Кирилл');
$mail->addAddress('belousovk495@gmail.com');
$mail->isHTML(true);
$mail->Subject = '<strong>Текст письма</strong>';
$mail->Body    = ' <p>Текст письма</p> </br> <b>1-ая строчка </b> </br><i>2-ая строчка </i> </br';
$mail->AltBody = 'This is the body in plain text for non-HTML mail clients';

if ($mail->send()) {
    echo "Письмо отправлено";
} else {
    echo "Письмо не отправлено";
    echo "Ошибка:" . $mail->ErrorInfo;
}
//
//$to  = "<belousovk495@gmail.com>, " ;
//$to .= "belousovk495@gmail.com>";
//
//$subject = "Заголовок письма";
//
//$message = ' <p>Текст письма</p> </br> <b>1-ая строчка </b> </br><i>2-ая строчка </i> </br>';
//
//$headers  = "Content-type: text/html; charset=windows-1251 \r\n";
//$headers .= "From: От кого письмо <from@example.com>\r\n";
//$headers .= "Reply-To: reply-to@example.com\r\n";
//echo $_POST['name'];
//echo $_POST['phone'];
//mail($to, $subject, $message, $headers);
//header('Location: http://belouso4.beget.tech/');
//exit;
