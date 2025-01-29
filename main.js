async function exchangeAuthCodeForToken(authCode) {
    const response = await fetch('https://oauth2.googleapis.com/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
            client_id: '873616028165-hfv1ho2rnde0a4pcps2abngp56vk14dr.apps.googleusercontent.com',
            client_secret: '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',
            code: authCode,
            grant_type: 'authorization_code',
            redirect_uri: 'https://ademkocoguz.github.io/adsapi/oauth2callback'
        })
    });

    const data = await response.json();
    console.log(data);

    if (data.access_token) {
        localStorage.setItem('access_token', data.access_token);
        localStorage.setItem('refresh_token', data.refresh_token);
        alert("Yetkilendirme başarılı!");
    } else {
        alert("Yetkilendirme başarısız: " + data.error);
    }
}
