            // Create layers instances
            var layerOSM = new ol.layer.Tile({
                source: new ol.source.OSM(),
                name: 'OpenStreetMap'
            });

            var layerMQ = new ol.layer.Tile({
                source: new ol.source.OSM({
                    layer: 'osm'
                }),
                name: 'MapQuest'
            });
            var layerStamenWater = new ol.layer.Tile({
                source: new ol.source.Stamen({
                    layer: 'watercolor'
                }),
                name: 'Watercolor'
            });
            var layerStamenTerrain = new ol.layer.Tile({
                source: new ol.source.Stamen({
                    layer: 'terrain'
                }),
                name: 'Terrain'
            });
            var layerStm = new ol.layer.Group({
                layers: [layerStamenWater, layerStamenTerrain],
                name: 'Stamen Group'
            });

            // Create map
            var map = new ol.Map({
                target: 'map',  // The DOM element that will contains the map
                renderer: 'canvas', // Force the renderer to be used
                layers: [layerOSM, layerMQ, layerStm],
                // Create a view centered on the specified location and zoom level
                view: new ol.View({
                    center: ol.proj.transform([-100.1833, 41.3833], 'EPSG:4326', 'EPSG:3857'),
                    zoom: 4
                })
            });

            // Name the root layer group
            map.getLayerGroup().set('name', 'Root');

            /**
             * Build a tree layer from the map layers with visible and opacity 
             * options.
             * 
             * @param {type} layer
             * @returns {String}
             */
            function buildLayerTree(layer) {
                var elem;
                var name = layer.get('name') ? layer.get('name') : "Group";
                var div = "<li data-layerid='" + name + "'>" +
                        "<span><i class='glyphicon glyphicon-file'></i> " + layer.get('name') + "</span>" +
                        "<i class='glyphicon glyphicon-check'></i> " +
                        "<input style='width:80px;' class='opacity' type='text' value='' data-slider-min='0' data-slider-max='1' data-slider-step='0.1' data-slider-tooltip='hide'>";
                if (layer.getLayers) {
                    var sublayersElem = ''; 
                    var layers = layer.getLayers().getArray(),
                            len = layers.length;
                    for (var i = len - 1; i >= 0; i--) {
                        sublayersElem += buildLayerTree(layers[i]);
                    }
                    elem = div + " <ul>" + sublayersElem + "</ul></li>";
                } else {
                    elem = div + " </li>";
                }
                return elem;
            }

            /**
             * Initialize the tree from the map layers
             * @returns {undefined}
             */
            function initializeTree() {

                var elem = buildLayerTree(map.getLayerGroup());
                $('#layertree').empty().append(elem);

                $('.tree li:has(ul)').addClass('parent_li').find(' > span').attr('title', 'Collapse this branch');
                $('.tree li.parent_li > span').on('click', function(e) {
                    var children = $(this).parent('li.parent_li').find(' > ul > li');
                    if (children.is(":visible")) {
                        children.hide('fast');
                        $(this).attr('title', 'Expand this branch').find(' > i').addClass('glyphicon-plus').removeClass('glyphicon-minus');
                    } else {
                        children.show('fast');
                        $(this).attr('title', 'Collapse this branch').find(' > i').addClass('glyphicon-minus').removeClass('glyphicon-plus');
                    }
                    e.stopPropagation();
                });
            }

            /**
             * Finds recursively the layer with the specified key and value.
             * @param {ol.layer.Base} layer
             * @param {String} key
             * @param {any} value
             * @returns {ol.layer.Base}
             */
            function findBy(layer, key, value) {

                if (layer.get(key) === value) {
                    return layer;
                }

                // Find recursively if it is a group
                if (layer.getLayers) {
                    var layers = layer.getLayers().getArray(),
                            len = layers.length, result;
                    for (var i = 0; i < len; i++) {
                        result = findBy(layers[i], key, value);
                        if (result) {
                            return result;
                        }
                    }
                }

                return null;
            }


            $(document).ready(function() {

                initializeTree();

                // Handle opacity slider control
                $('input.opacity').slider().on('slide', function(ev) {
                    var layername = $(this).closest('li').data('layerid');
                    var layer = findBy(map.getLayerGroup(), 'name', layername);

                    layer.setOpacity(ev.value);
                });

                // Handle visibility control
                $('i').on('click', function() {
                    var layername = $(this).closest('li').data('layerid');
                    var layer = findBy(map.getLayerGroup(), 'name', layername);

                    layer.setVisible(!layer.getVisible());

                    if (layer.getVisible()) {
                        $(this).removeClass('glyphicon-unchecked').addClass('glyphicon-check');
                    } else {
                        $(this).removeClass('glyphicon-check').addClass('glyphicon-unchecked');
                    }
                });

            });