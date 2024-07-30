//=> Función para dar formato al campo de fecha
export  function formatDate(timestamp) {
    const date = timestamp?.toDate();
    return date?.toLocaleString();  
} 