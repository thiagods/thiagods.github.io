atualiza_mapa(2007);
data3 = ["2007","2008","2009","2010","2011","2012","2013","2014","2015","2016","2017"]

var slider = d3.sliderHorizontal()
                .min(2007)
                .max(2017)
                .step(1)
                .width(400)
                .tickFormat(d3.format(''))
                .tickValues(data3)
                .on('onchange', function() {
                    atualiza_mapa(slider.value());
                    atualiza_barras(cidade, slider.value());
                    atualiza_barras_ano(cidade);
                });

var g = d3.select("#slider").append("svg")
            .attr("width", 500)
            .attr("height", 100)
            .append("g")
            .attr("transform", "translate(30,30)");

g.call(slider);