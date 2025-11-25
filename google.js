// google.js

// Этот файл отвечает за вход через Google OAuth 2.0

function handleGoogleLogin(){
  // Замените на ваши реальные данные OAuth 2.0
  const CLIENT_ID = 'YOUR_GOOGLE_CLIENT_ID';
  const REDIRECT_URI = 'YOUR_REDIRECT_URI';
  const SCOPE = 'profile email';

  const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&response_type=token&scope=${encodeURIComponent(SCOPE)}`;

  const authWindow = window.open(authUrl,'googleLogin','width=500,height=600');

  const pollTimer = setInterval(()=>{
    try{
      if(authWindow.location.href.indexOf(REDIRECT_URI) !== -1){
        const url = new URL(authWindow.location);
        const hash = url.hash.substring(1);
        const params = new URLSearchParams(hash);
        const access_token = params.get('access_token');
        if(access_token){
          console.log('Google Access Token:', access_token);
          alert('Вход через Google выполнен!');
          authWindow.close();
          clearInterval(pollTimer);
          // Здесь можно получить профиль пользователя и интегрировать с форумом
          // fetch('https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token='+access_token)
          //   .then(res=>res.json()).then(profile=>{console.log(profile);});
        }
      }
    } catch(e){
      // кросс-домен ошибки ожидаются до редиректа
    }
  },500);
}

document.getElementById('googleLoginBtn').addEventListener('click', handleGoogleLogin);
