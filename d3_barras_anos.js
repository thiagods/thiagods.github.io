

function desenha_barras_ano(data, cidade){

	var margin = 30;
	var width = 350;
	var height = 150;

	var x_ini = 30;
	var max = d3.max(data);
	var ano_inicial = 2007

	var x = d3.scaleBand()
				.domain([2007, 2008, 2009, 2010, 2011,2012, 2013, 2014, 2015, 2016, 2017])
				.range([0,width]);
			
	var y = d3.scaleLinear()
				.domain([0,max+Math.ceil(max*0.1)])
				.range([height,0]);


	var div_bar_ano = d3.select("body")
					.append("div")   
					.attr("class", "tooltip")               
					.style("opacity", 0);

	var chart_ano = d3.select(".chart_ano");
	var titulo = cidade;

	chart_ano.attr("width",width + 2*margin)
			.attr("height",height + 4*margin)
			.append("g")
			.attr("transform","translate(" + (margin+x_ini) + "," + margin + ")")
			.selectAll("rect")
			.data(data)
			.enter().append("rect")
			.attr("width",margin-1)
			.attr("height",function(d) { return height - y(d); })
			.attr("x",function(d,i) { return x(i+ano_inicial-1); })
			.attr("y",function(d) { return y(d); })
			.on('mouseover', mouseover_bar_ano)
			.on('mouseout', mouseout_bar_ano);

	chart_ano.append("text")
        .attr("x", (width / 2)+margin+x_ini)             
        .attr("y", margin)
        .attr("text-anchor", "middle")  
        .style("font-size", "16px") 
        // .style("text-decoration", "underline")  
        .text(titulo);

	chart_ano.append("g")
			.attr("transform", "translate(" + (margin+x_ini) + "," + margin + ")")
			.call(d3.axisLeft(y));

	chart_ano.append("text")             
	      .attr("transform", "translate(" + (width-100) + " ," + (height + margin + 35) + ")")
	      .style("text-anchor", "middle")
	      .text("Anos");

	chart_ano.append("g")
			.attr("transform", "translate(" + (margin+x_ini) + "," + (height+margin) + ")")
			.call(d3.axisBottom(x));

	chart_ano.append("text")
	      .attr("transform", "rotate(-90)")
	      .attr("y", 0 - margin.left-15)
	      .attr("x",0 - (height / 2)-margin)
	      .attr("dy", "1em")
	      .style("text-anchor", "middle")
	      .text("Ocorrências");  

	function mouseover_bar_ano(d){
		var dados_totais = get_ocorrencias_totais();
		
		div_bar_ano.transition()       
				.duration(200)      
				.style("opacity", .9);

		div_bar_ano.html(d)
				.style("left", (d3.event.pageX) + "px")     
				.style("top", (d3.event.pageY - 28) + "px")      
				.style("height", 20 + "px")      
				.style("background", "black")      
				.style("color", "white")      
	}

	function mouseout_bar_ano(d){
		 div_bar_ano.transition()       
				.duration(200)
				.style("opacity", .0);
	}
}

function atualiza_barras_ano(cidade){
	$(".chart_ano").empty();

	if(cidade != null){
		var data = get_ocorrencias_anos(cidade);
		if(data != null){
			desenha_barras_ano(data, cidade);
		} else {
			alert(cidade + " não possui dados sobre ocorrências");
		}
	}	
}