<?php

namespace App\Http\Controllers;

use App\Mail\ConteneurMail;
use Illuminate\Support\Facades\Mail;

class EmailController extends Controller
{
    public function sendEmail($emailData, $recipients)
    {
        foreach ($recipients as $recipent) {
            info('Sending email to ' . $recipent);
            $email = Mail::to($recipent)->send(new ConteneurMail($emailData));
            info('Email sent successfully');
        }
        info('Email sent successfully');
        return back()->with('success', 'Votre email a été envoyé avec succès!');
    }
}
