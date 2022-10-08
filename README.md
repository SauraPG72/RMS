# RMS2
My final General Assembly project app. 

# Stack used:
- PSQL
- NODE.JS
- EXPRESS
- REACT 

# What is Trekka!
- Trekka is the first of it's kind, email relationship management tool that interfaces directly with the Gmail API
- It re - organises the traditional email inbox, and it helps the busy person of the 21st century, vanigate their emails by people, and conversation rather than the chronologically sorted threads of the traditional inbox!

# Highlighted CODE BLOCKS

```JavaScript 
        const accessDb = (id) => {
        return db.query("SELECT * from users WHERE id = $1", [id]).then((res) => res.rows[0]);
      };
      
      const getNewToken = async () => {
        const tokensObj = await accessDb(req.session.user_id);
      
        const params = new URLSearchParams();
        let newAccToken;
        params.append("client_id", tokensObj.client_id);
        params.append("client_secret", tokensObj.secret_key);
        params.append("refresh_token", tokensObj.refresh_token);
        params.append("grant_type", "refresh_token");
        newAccToken = await axios
          .post("https://accounts.google.com/o/oauth2/token", params)
          .then((res) => {
            return res.data.access_token;
          });
      
        return newAccToken;
      };
```



