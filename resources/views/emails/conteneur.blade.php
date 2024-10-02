<h1>Nouveau Conteneur</h1>
<p>Un nouveau conteneur a été créé.</p>

<p>Numéro : {{ $details['numero'] }}</p>
<p>Quantité : {{ $details['quantity'] }}</p>
<p>Reste : {{ $details['reste'] }}</p>
<p>Date de création : {{ $details['created_at'] }}</p>
<p>Créateur : {{ $details['creator'] }}</p>
<p>URL : <a href="{{ $details['url'] }}">{{ $details['url'] }}</a></p>
@php(info('Url ' . $details['url']))
