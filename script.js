var amountInput= document.getElementById('initAmount')
var monthsInput = document.getElementById('months')
var calcBtn = document.getElementById('calcBtn')
let initialAmount;
let months;
let total ;
let principal;
var totals=[];
var fee=25;
var xValues=[];
var totalROI = 0;
var ROIs=[]
let USDollar = new Intl.NumberFormat('en-US', {
                                    style: 'currency',
                                    currency: 'USD',
                                    });
document.forms[0].addEventListener('submit', calculate)
amountInput.addEventListener('change',(e)=>{
    initialAmount=e.target.value
    principal =e.target.value
    })
monthsInput.addEventListener('change',(e)=>{
    months=e.target.value;
    })
function calculate(e){
    e.preventDefault();
    if(initialAmount>=100){
        document.getElementById('t-header').style+="display:block"
        for(let i=0;i<months; i++){  
            if(initialAmount>25000){
                fee=0
                console.log(true)
            }  
            for (let i = 0; i < 4; i++) {
                
                const randomROI = ((Math.random()*(3.5-2.7)+2.7)/100)
                totalROI +=randomROI 
                total = initialAmount*(1+randomROI)
                initialAmount=total
            }
            totals.push((total-25).toFixed(2))
            avgROI = totalROI/4
            ROIs.push(avgROI)
            totalROI=0
            avgROI=0
        }
        initialAmount=principal;
        if(initialAmount){ 
            ROIs.unshift(0)
            totals.unshift(initialAmount)
            showTotals()
        }  
    }else{
        alert("Amount too small")
        amountInput.focus()
    }
   
 }
 function showTotals(){
    const showInHtml = totals.map((tot,index)=>{
        xValues.push(index)
        return`
            <tr>
                <td>${index}</td>
                <td>${USDollar.format(tot)}</td>
                <td>+${(ROIs[index]*100).toFixed(2)}%</td>
            </tr>
        `
    }).join('')
        document.querySelector('#table').innerHTML=showInHtml
    
    drawGraph()
 }
 function drawGraph(){
    new Chart(document.getElementById("myChart"),{
        type:"line",
        data:{
            labels:xValues,
            datasets:[{
                fill:false,
                pointRadius: 1,
                backgroundColor: "rgba(0,0,255,1.0)",
                borderColor: "rgba(0,0,255,0.4)",
                data: totals
            }]
        },
        options:{
            legend:{display:false},
            title:{
                display:true,
                text:"Compounding behaviour",
                fontSize:16
            },
            scales: {
                xAxes: [{
                  scaleLabel: {
                    display: true,
                    labelString: 'Months'
                  }
                }],
                yAxes: [{
                    scaleLabel: {
                      display: true,
                      labelString: 'Principal'
                    }
                  }]
              }
        }
    })
    document.querySelector("#t-header").scrollIntoView({
        behavior:"smooth",
        inline:"center"
    })
    totals=[]
    xValues=[]
    ROIs=[]
 }