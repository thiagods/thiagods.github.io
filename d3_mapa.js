cidade = null;

function desenha_mapa(ano){

	var width = 700;
	var height = 500;
	var min_color = '#a8c0ff';
	var max_color = '#3f2b96';
	var valor_min = 0;
	var valor_max = max_ocorrencias();

	// Criando a legenda
	var w = 130, h = 300;

	var key = d3.select("#mapa")
	            .append("svg")
	            .attr("width", w-40)
	            .attr("height", 400)
	            .attr("class", "legend");

	var legend = key.append("defs")
	                .append("svg:linearGradient")
	                .attr("id", "gradient")
	                .attr("x1", "100%")
	                .attr("y1", "0%")
	                .attr("x2", "100%")
	                .attr("y2", "100%")
	                .attr("spreadMethod", "pad");

	legend.append("stop")
	        .attr("offset", "0%")
	        .attr("stop-color", max_color)
	        .attr("stop-opacity", 1);
	    
	legend.append("stop")
	        .attr("offset", "100%")
	        .attr("stop-color", min_color)
	        .attr("stop-opacity", 1);

	key.append("rect")
	    .attr("width", w - 100)
	    .attr("height", h)
	    .style("fill", "url(#gradient)")
	    .attr("transform", "translate(0,10)");

	var y = d3.scaleLinear()
	            .range([h, 0])
	            .domain([valor_min, valor_max]);

	var yAxis = d3.axisRight(y);

	key.append("g")
	    .attr("class", "y axis")
	    .attr("transform", "translate(41,10)")
	    .call(yAxis)

	// criando o mapa
	var color = d3.scaleSqrt()
	                .domain([valor_min, valor_max])
	                .range([min_color, max_color])
	                .interpolate(d3.interpolateLab);

	var svg_mapa = d3.select("#mapa")
	                    .append("svg")
	                    .attr("width", width)
	                    .attr("height", height);

	var projection = d3.geoMercator()
	                    .center([-42,-22])
	                    .scale(9000);

	var path = d3.geoPath()
	                .projection(projection);

	var div = d3.select("body").append("div")   
	            .attr("class", "tooltip")               
	            .style("opacity", 0);

	queue().defer(d3.json, "municipios.json").await(draw);

	function draw(error, municipios){

	    if (error) return console.error(error);

	    var cidades = topojson.feature(municipios, municipios.objects.municipalities);            

	    svg_mapa.append('g')
	            .attr("class", "cidades")
	            .selectAll("path")
	            .data(cidades.features)
	            .enter()
	            .append("path")
	            // .attr('vector-effect', 'non-scaling-stroke')
	            .style("stroke", "#005500") 
	            .style("stroke-width", "1")
	            .style('fill', fill)
	            .attr('d', path)
	            .on("click", click)
	            .on('mouseover', mouseover)
	            .on('mouseout', mouseout)
	            
	}

	function click(d){
	    atualiza_barras(d.properties.name, ano);
	    atualiza_barras_ano(d.properties.name);
	    cidade = d.properties.name;
	}

	function mouseover(d){
	    var dados_totais = get_ocorrencias_totais(ano);
	    
	    div.transition()       
	        .duration(200)      
	        .style("opacity", .9);

	    try {
	        div.html("<strong>Cidade: </strong><span>" + d.properties.name + "<br></span>" + "<strong>Ocorrências: </strong><span>" + dados_totais[d.properties.name].total.toLocaleString('pt-BR') +"</span>")
	            .style("left", (d3.event.pageX) + "px")     
	            .style("top", (d3.event.pageY - 28) + "px")
	    }
	    catch(err) {
	         div.html("<strong>Cidade: </strong><span>" + d.properties.name + "<br></span>" + "<strong>Ocorrências: </strong><span>" + "Desconhecido" +"</span>")  
	            .style("left", (d3.event.pageX) + "px")     
	            .style("top", (d3.event.pageY - 28) + "px")
	    }           
	}

	function mouseout(d){
	   div.transition()       
	        .duration(200)      
	        .style("opacity", .0);
	}

	function fill(d){
	    var dados_totais = get_ocorrencias_totais(ano);

	    try {
	        return color(dados_totais[d.properties.name].total);
	    }
	    catch(err) {
	        return color('#000000');
	    }
	}

	function max_ocorrencias(){
		var dados_totais = get_ocorrencias_totais(ano);
		var max = 0;

		for (var cidade in dados_totais) {
			if(dados_totais[cidade]["total"] > max){
				max = dados_totais[cidade]["total"];
			}
		}

		return max;
	}
}

function atualiza_mapa(ano){
    $("#mapa").empty();
    desenha_mapa(ano);
}