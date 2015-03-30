function login() {
    var params = {
        'callback': signinCallback,
        'clientid': '590481571447-e8rd481uo2mcspc6vuck5mndkpbfro6a.apps.googleusercontent.com',
        'scope': 'https://www.googleapis.com/auth/plus.profile.emails.read',
        'requestvisibleactions': 'http://schema.org/AddAction',
        'cookiepolicy': 'single_host_origin'
    };
    gapi.auth.signIn(params);
}

function signinCallback(authResult) {
    if (authResult['status']['signed_in']) {
    // Update the app to reflect a signed in user
    // Hide the sign-in button now that the user is authorized, for example:
    document.location.href = '/auth?code=' + authResult.code
  }
}