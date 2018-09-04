ano = 2017

atualiza_mapa(ano);

var data3 = d3.range(0, 11)
                .map(function (d) { return new Date(2007 + d, 10, 3); });

data3 = ["2007","2008","2009","2010","2011","2012","2013","2014","2015","2016","2017"]

var slider3 = d3.sliderHorizontal()
                .min(2007)
                .max(2017)
                .step(1)
                .width(400)
                .tickFormat(d3.format(''))
                .tickValues(data3)
                .on('onchange', function() {
                    atualiza_mapa(slider3.value());
                    atualiza_dados(cidade, slider3.value());
                    atualiza_barras_ano(cidade);
                });

var g = d3.select("#slider3").append("svg")
            .attr("width", 500)
            .attr("height", 100)
            .append("g")
            .attr("transform", "translate(30,30)");

g.call(slider3);