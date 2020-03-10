import md5 from 'md5';

export const HEROES = (llamado) =>{
  var ts = Date.now();
  const privateKey = 'b05d8a26db8acc6f48d50c93824ff00a19c5cb61',
        publicKey = 'f97f541a27560153f37504b1f5078573';

  const hash = md5(ts+privateKey+publicKey)
  const URL = (`http://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${publicKey}&hash=${hash}&limit=3`);

  llamado = fetch(URL).then(res => res.json()).then(datos => {
       const i = datos.data.results.map(row =>{
          return {value: row.id, label: row.name, imagen: row.thumbnail.path+'/portrait_xlarge.jpg', descripcion: row.description}
        })
        console.log("personajes", i);
  })
}

export const Marvel = (llamado)=>{
  HEROES(llamado)
}
console.log("HEY MARVEL", Marvel())

export default HEROES;