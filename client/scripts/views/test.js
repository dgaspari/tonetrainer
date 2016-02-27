'use strict';

var Recorder = require('../app/recorder/recorder.js')

var TestView = Backbone.View.extend({

  el: '#app-wrapper',

  template: JST['client/templates/test'],

  events: {
    'click .link-out': 'navigateAway',
    'change #example_select': 'selectExample',
    'click .recalc-freq': 'selectExample'
  },

  audio_context: null,

  volume: null,

  recorder: null,

  initialize: function() {
    this.render();
    this.populateControls();
  },

  render: function() {
    this.$el.html(this.template);
    return this;
  },

  populateControls: function() {
    var self = this;
    var aSelect = $('#example_select');
    $.get('test/getallexamples', function(exampleData) {
      aSelect.empty();
      for (var aId in exampleData) {
        var aText = '(' + exampleData[aId].ExampleId  + ') - ' + exampleData[aId].Name + ' - '  + exampleData[aId].MandarinWord;
        aText += ' - ' + exampleData[aId].PinyinWord;
        aSelect.append($('<option></option>').attr('value', exampleData[aId].ExampleId).text(aText));
      }
      self.selectExample();
    });
  },

  selectExample: function() {
    var self = this;
    var exampleId = $('#example_select').val();
    $('.exampleChart').hide();
    $.get('test/getsample?example=' + exampleId, function(exampleData) {
      window.exampleFreq = $.parseJSON(exampleData.PitchJson);
      window.exampleFreq.unshift('example voice frequency (hz)');
      var snd = new Audio("data:audio/wav;base64," + exampleData.WavFile);
      snd.play();
      var aBinary = atob(exampleData.WavFile);
      var aLen = aBinary.length;
      var aBuffer = new ArrayBuffer(aLen);
      var aView = new Uint8Array(aBuffer);
      for(var i=0; i<aLen; i++) {
        aView[i] = aBinary.charCodeAt(i);
      }
      var aBlob = new Blob( [aView], { type: "audio/wav" });
      var wavFileBlobUrl = URL.createObjectURL(aBlob);
      $('.example-audio-player').attr('src',wavFileBlobUrl);

      self.handleWAV(aBlob);
    });
  },

  handleWAV: function(blobdata) {
    var self = this;
    console.log('passing blob to python module...');
    var uploadData = new FormData();
    uploadData.append('audiodata', blobdata);
    uploadData.append('tcost', $('#rapt_tcost').val());
    uploadData.append('dcost', $('#rapt_dcost').val());
    uploadData.append('addconst', $('#rapt_addconst').val());
    uploadData.append('vobias', $('#rapt_vobias').val());
    uploadData.append('lagwt', $('#rapt_lagwt').val());
    uploadData.append('freqwt', $('#rapt_freqwt').val());
    uploadData.append('numcands', $('#rapt_numcands').val());
    uploadData.append('istwopass', $('#rapt_istwopass').val());
    uploadData.append('isfilter', $('#rapt_isrunfilter').val());
    $.ajax({
      url: 'test/testsendfreq',
      type: 'POST',
      data: uploadData,
      contentType: false,
      processData: false,
      timeout: 85000,
      success: function(results) {
        console.log('rpc call returned:');
        if(results.freqmap) {
          results.freqmap.unshift('new test voice frequency (hz)');
          var chart = c3.generate({
            bindto: '.exampleChart',  //'.audioChart',
            data: {
              columns: [
                window.exampleFreq,
                results.freqmap
              ]
            }
          });
        }
        else {
          var chart = c3.generate({
            bindto: '.exampleChart',
            data: {
              columns: [
                window.exampleFreq
              ]
            }
          });
        }
        $('.exampleChart').show();

        if(results.nccf) {
          //populate heat map:
          var heatContainer = document.getElementById('nccf_map');
          var heatMapConfig = { 
            container: heatContainer, 
            backgroundColor: 'rgba(0,0,0,.95)', 
            maxOpacity: .9, 
            minOpacity: .3,
            gradient: {
              '.5': 'blue',
              '.8': 'red',
              '.95': 'white'
            }
          };
          // var heatMapInstance = h337.create(heatMapConfig);
          var dataPoints = [];
          var xPoints = [];
          var yPoints = [];
          var zPoints = [];
          for(var i=0;i<results.nccf[0].length;i++) {
            xPoints.push(i);
            var newZPoints = [];
            for(var k=88;k<883;k++) {
              var x = i;
              var y = k;
              yPoints.push(y);
              var z = 0.0;    
              if(results.nccf[0][i][0][0] != 0 && results.nccf[0][i][0][1] != 0 && results.nccf[0][i][0][0] === k) {
                z = results.nccf[0][i][0][1]; 
                var newDataPoint = { x: x, y: y, z: z};
                dataPoints.push(newDataPoint);
                results.nccf[0][i].shift();
              }
              newZPoints.push(z);
            }
            zPoints.push(newZPoints);
          }

          var nccfJsonString = JSON.stringify(dataPoints, undefined, 4);
          //var nccfJsonString = JSON.stringify(results.nccf, undefined, 4);
          $('#nccf_output').val('');
          $('#nccf_output').val(nccfJsonString);
          var data = [{
            z: zPoints,
            y: yPoints,
            x: xPoints,
            type: 'heatmap'
          }];
          Plotly.newPlot('nccf_map', data);

          //heatMapInstance.addData(dataPoints);
        }
      }
    });
  },
  
  navigateAway: function(e) {
    this.unbind();
    this.undelegateEvents();
  }

});

module.exports = TestView;
