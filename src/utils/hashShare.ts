//a function which generates the share hash 
export function ShareHashGenerator(len:number){
    let Option="querstabstursinpdnsdc";
    let length=Option.length;
    
    let ans="";
    for(let i=0;i<len;i++){
        ans +=Option[Math.floor(Math.random()*length)]//this give long number
    }
    return ans;
}

