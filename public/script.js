import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm"
import data from './data.json' with {type : 'json'}

d3.select("svg")
  .style("background-color", "#c4bdbdff");

const svg = d3.select("svg"),
  margin = {top: 40, right: 500, bottom: 80, left: 70}, // margen 

 /*
  Es para el tamaño del área interna del svg (dibujo de las barras)
  restando los márgenes para que los ejes y barras
  no se corten en los bordes , osea esto resta los margenes sup/inf. y der./izqu.
*/
  width = +svg.attr("width") - margin.left - margin.right,
  height = +svg.attr("height") - margin.top - margin.bottom;

const g = svg.append("g")
  .attr("transform", `translate(${margin.left},${margin.top})`); // translada el grafico manteniando su margen 


  d3.json("data.json").then(data => {
  // Escalas
  const y = d3.scaleBand() 
   .domain(data.map(d => d.Año)) // datos a partir del año
   .range([0, height]) //altura 
   .padding(0.2); // espacio entre barras

  const x = d3.scaleLinear()
    .domain([0,100]) //valor desde 0 a 100
    .range([0, width]); //ancho

  // Ejes
  g.append("g")
    .call(d3.axisLeft(y));   // dibuja el eje vertical ,osea el eje Y

  g.append("g")
    .attr("transform", `translate(0,${height})`) //translada a la parte inferior , referencia d3-axis
    .call(d3.axisBottom(x)); // dibuja la linea de los porcentajes, osea el eje X

  // Barras Renovables
  g.selectAll(".bar.renovables")
    .data(data) //enlaza los datos del json
    .enter().append("rect") //crea una barra por cada dato (rectangulo)
    .attr("class", "bar renovables") //asigna la clase
    .attr("y", d => y(d.Año)) // La barra se posicion en el año que le corresponde
    .attr("x", 0) // empieza desde el valor 0 la barra 
    .attr("height", y.bandwidth() / 2.5) //tamaño de la barra
    .attr("width", d => x(d.Renovables)) //el valor desde el data.json
    .attr("fill", "#00ff00ff") //color de barra

    
   const etiqueta = d3.select(".etiqueta")

    // Tooltip para barras Renovables
g.selectAll(".bar.renovables")
  .on("mouseover", (event, d) => {
    etiqueta.html(`Renovables: ${d.Renovables}%`) //accdete a los datos del data
           .style("opacity", 1);
  })
  .on("mousemove", (event) => {
    etiqueta.style("left", (event.pageX + 10) + "px") // esta es la posicion horizontal para seguir el cursol (tooltip)
           .style("top", (event.pageY - 25) + "px"); //esta es la posicion vertical para seguir el cursol (tooltip)
  })
  .on("mouseout", () => {
    etiqueta.style("opacity", 0);
  });
    

  // Barras No Renovables
  g.selectAll(".bar.no-renovables")
    .data(data) //enlaza los datos del json
    .enter().append("rect") //crea una barra por cada dato (rectangulo)
    .attr("class", "bar no-renovables") //asigna la clase
    .attr("y", d => y(d.Año) + y.bandwidth() / 2) /* La barra se posicion en el año que le corresponde y 
    se mueve hacia abajo para no quede encima de la otra barra*/
    .attr("x", 0) // empieza desde el valor 0 la barra 
    .attr("height", y.bandwidth() / 2.5)  //tamaño de la barra
    .attr("width", d => x(d.No_Renovables)) //el valor desde el data.json
    .attr("fill" ,"#004430ff"); //color de la barra

    // Tooltip para barras No Renovables
g.selectAll(".bar.no-renovables")
  .on("mouseover", (event, d) => {
    etiqueta.html(`No Renovables: ${d.No_Renovables}%`)//accdete a los datos del data
           .style("opacity", 1);
  })
  .on("mousemove", (event) => {
    etiqueta.style("left", (event.pageX + 10) + "px") // esta es la posicion horizontal para seguir el cursol (tooltip)
           .style("top", (event.pageY - 25) + "px"); //esta es la posicion vertical para seguir el cursol (tooltip)
  })
  .on("mouseout", () => {
    etiqueta.style("opacity", 0);
  });

    
  // leyenda
  const leyenda = svg.append("g")
    .attr("transform", `translate(${width - 700},500)`); // se translada en la parte inferior

  // leyenda para Renovables
  leyenda.append("rect")
    .attr("x", 0).attr("y",60) // posicion
    .attr("fill", "#00ff00ff")//color leyenda
    .attr("stroke", "#101010")    // color del borde
    .attr("stroke-width", 1)      // grosor del borde
    .attr("width", 20).attr("height", 20) //tamaño del cuadrado
    .attr("class", "Renovables");  // estilo de clase de la leyenda

  leyenda.append("text")
    .attr("x", 30).attr("y", 75) // posicion
    .attr("class", "leyenda") // estilo de clase de la leyenda
    .text("Renovables"); // nombre

    //porcetanje media Renovable
  svg.append('circle')
   .attr('cx', 920) //posicion
   .attr('cy', 400) //posicion
   .attr('r', 15) //radio
   .attr('stroke', 'black') //contorno
   .attr('fill', '#00ff00ff'); //color de relleno

  svg.append("text")
    .attr("x", 940).attr("y", 405) // posicion
    .attr("class", "leyenda") // estilo de clase
    .text("Promedio de energías Renovables: 49,2%"); // nombre + porcentaje

    // leyenda para No_Renovables
  leyenda.append("rect")
    .attr("x", 130).attr("y",60) // posicion
    .attr("fill", "#004430ff")//color leyenda
    .attr("stroke", "#101010")    // color del borde
    .attr("stroke-width", 1)      // grosor del borde
    .attr("width", 20).attr("height", 20) //tamaño del cuadrado
    .attr("class", "Renovables");  // estilo de clase de la leyenda

  leyenda.append("text")
    .attr("x",160).attr("y",75)  //posicion
    .attr("class", "leyenda") // estilo de clase de la leyenda
    .text("No Renovables"); // nombre

     //porcetanje media No_ Renovable
  svg.append('circle')
   .attr('cx', 920)//posicion
   .attr('cy', 450) //posicion
   .attr('r', 15)//tamaño
   .attr('stroke', 'black') //contorno
   .attr('fill', '#004430ff'); //color de relleno

  svg.append("text")
    .attr("x", 940).attr("y", 455) // posicion
    .attr("class", "leyenda") // estilo de clase de la leyenda
    .text("Promedio de energías No Renovables: 50,8 %"); // nombre + porcentaje

  //titulo
svg.append("text") 
   .attr("class", "texto-Titulo") //estilo de clase
   .attr("x", 860) //posicion
   .attr("y", 150) //posicion
   .text("Chile en Transformación: "); //texto 1

svg.append("text")
   .attr("class", "texto-Titulo") //estilo de clase
   .attr("x", 860) //posicion
   .attr("y", 185) //posicion
   .text("El Auge de las Energías"); //texto 2

svg.append("text")
   .attr("class", "texto-Titulo") // estilo de clase
   .attr("x", 860) //posicion
   .attr("y", 220) //posicion
   .text("Renovables (2010–2024)"); //texto 3

   //texto de descripcion del grafico 
svg.append("text") 
   .attr("class", "texto-cuerpo") //estilo de clase
   .attr("x", 860) //posicion
   .attr("y", 260) //posicion
   .text("Esta visualización muestra cómo en los últimos 15 años,"); //texto 1

svg.append("text") 
    .attr("class", "texto-cuerpo") //estilo de clase
   .attr("x", 860) //posicion
   .attr("y", 280) //posicion
   .text("las energías renovables en Chile han crecido mientras"); //texto 2

svg.append("text") 
   .attr("class", "texto-cuerpo") //estilo de clase
   .attr("x", 860) //posicion
   .attr("y", 300) //posicion
   .text(" las fuentes fósiles han desminuido,reflejando la transición"); //texto 3

   svg.append("text") 
   .attr("class", "texto-cuerpo") //estilo de clase
   .attr("x", 860) //posicion
   .attr("y", 320) //posicion
   .text("hacia un sistema eléctrico más sustentable."); //texto 4

    // Dibujar una línea horizontal
  svg.append("line")
       .attr("x1", 35)
       .attr("y1", 20)
       .attr("x2", 1315)
       .attr("y2", 20)
       .attr("stroke", "black") //colo de la linea
       .attr("stroke-width", 1); //grosor de linea

    //hashtag
  svg.append("text") 
   .attr("class", "texto-hashtag") //estilo de texto
   .attr("x", 37) //posicion
   .attr("y", 30) //posicion
   .text("#EnergíaRenovableChile "); // texto 

});