<?php
$to  = "<belousovk495@gmail.com>, " ;
$to .= "belousovk495@gmail.com>";

$subject = "Заголовок письма";

$message = ' <p>Текст письма</p> </br> <b>1-ая строчка </b> </br><i>2-ая строчка </i> </br>';

$headers  = "Content-type: text/html; charset=windows-1251 \r\n";
$headers .= "From: От кого письмо <from@example.com>\r\n";
$headers .= "Reply-To: reply-to@example.com\r\n";
echo $_POST['name'];
echo $_POST['phone'];
mail($to, $subject, $message, $headers);
header('Location: http://belouso4.beget.tech/');
exit;
