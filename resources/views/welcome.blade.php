<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Réception</title>
    <link href="{{ asset('css/bootstrap.min.css') }}" rel="stylesheet">
    <link href="{{ asset('css/fontawesome/css/all.css') }}" rel="stylesheet">
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
    <link href="{{ asset('css/responsive.css') }}" rel="stylesheet">
    <link href="{{ asset('build/css/index.css') }}" rel="stylesheet">
    <link href="{{ asset('build/css/talys.css') }}" rel="stylesheet">
</head>
<body class="font-sans antialiased dark:bg-black dark:text-white/50">
<div id="root"></div>
@vite('resources/js/index.jsx')
</body>
</html>
