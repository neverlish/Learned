{% extends "../layouts/default.swig" %}

{% block content %}
	<div class="container">
		<div class="jumbotron">
			<img src="/images/logo.svg" width="160">
			<h1>Welcome</h1>
			<p>This is your new <a href="http://keystonejs.com" target="_blank">KeystoneJS</a> website.</p>
			<p>
				It includes the latest versions of
				<a href="http://getbootstrap.com/" target="_blank">Bootstrap</a>
				and <a href="http://www.jquery.com/" target="_blank">jQuery</a>.
			</p>
			<p>Visit the <a href="http://keystonejs.com/guide" target="_blank">Getting Started</a> guide to learn how to customise it.</p>
			<hr>
			{% if user and user.canAccessKeystone %}
				<p>
					<a href="/keystone" class="btn btn-lg btn-primary">Open the Admin UI</a>
				</p>
			{% else %}
				<p>We have created a default Admin user for you with the email <strong>neverlish@gmail.com</strong> and the password <strong>121212</strong>.</p>
				<p>
					<a href="/keystone/signin" style="margin-right: 10px" class="btn btn-lg btn-primary">Sign in</a>
					to use the Admin UI.
				</p>
			{% endif %}
			<hr>
			<p>
				Remember to <a href="https://github.com/keystonejs/keystone" target="_blank">Star KeystoneJS on GitHub</a> and
				<a href="https://twitter.com/keystonejs" target="_blank">follow @keystonejs</a> on twitter for updates.
			</p>
		</div>
	</div>
{% endblock %}
