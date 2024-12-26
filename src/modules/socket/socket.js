import axios from "axios";

export const socketEvents = (io, socket) => {
    
    //create a client to get info
    socket.on("getPokemonData", async(params) => {
        try {
            //execute the axios consult
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/`, { params });
            socket.emit("pokemonData", response.data);
        } catch(error) {
            //capture any error
            console.error("Error fetching Pokémon data:", error);
            socket.emit("pokemonDataError", { error: "Error fetching data" });
        }
    });
    
    //create a client to get info
    socket.on("getAnyData", async(params) => {
        try {
            //execute the axios consult
            const response = await axios.get(`https://retoolapi.dev/2KgZIV/data`, { params });
            socket.emit("anyData", response.data);
        } catch(error) {
            //capture any error
            console.error("Error fetching Pokémon data:", error);
            socket.emit("anyDataError", { error: "Error fetching data" });
        }
    });
    
    socket.on("deleteData", async(id, deleteDataFromDatabase) => {
        try {
            // Realiza la eliminación del dato en la base de datos
            await deleteDataFromDatabase(id);
            
            // Notifica a todos los clientes que los datos han cambiado
            io.emit("dataUpdated", { id });
            
            console.log(`Data with id ${id} deleted successfully`);
        } catch(error) {
            console.error("Error deleting data:", error);
            socket.emit("deleteDataError", { error: "Error deleting data" });
        }
    });
    
    socket.on("disconnect", () => {
        console.log(`socket.io - socket.id \`${socket.id}\` disconnected`);
    });
};
