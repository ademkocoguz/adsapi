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


async function fetchCampaignData() {
    const campaignId = document.getElementById('campaign_id').value;
    const accessToken = localStorage.getItem('access_token');

    if (!accessToken) {
        alert("Önce Google ile giriş yapmalısınız!");
        return;
    }

    const response = await fetch(`https://googleads.googleapis.com/v12/customers/${campaignId}/campaigns`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'developer-token': 'YOUR_GOOGLE_ADS_DEVELOPER_TOKEN'
        }
    });

    const data = await response.json();
    document.getElementById('result').innerText = JSON.stringify(data, null, 2);
}
