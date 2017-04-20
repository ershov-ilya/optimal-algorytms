let defaultOptions = {
    floors: 100,
    balls: 2,
    fraction: 0.5,
    last_good_floor: 75
}

 /**
 * Рабочая функция расчёта
 * Конструктор представляет собой вычислительный процесс
 * Объект создаваемый конструтором будет содержать результат расчёта
 */ 
 function lastFloor(options, verbose=false){
    this.steps=0
    this.correct=true
    this.result=false
    this.reason=''
    this.options=Object.assign({},options)
    
    try{
    
    // Проверка валидности параметров
    if(options.last_good_floor>options.floors) { this.correct=false; this.reason='Incorrect last_good_floor' }
    if(options.fraction<=0 || options.fraction>=1) { this.correct=false; this.reason='Incorrect fraction' }
    if(options.floors<1) { this.correct=false; this.reason='Incorrect floors count' }
    if(this.correct==false) throw null
    
    // Stage 1 - у нас есть запасные стеклянные шары
    let balls=this.options.balls, bottom=1, top=options.floors, test_floor

    if(verbose) console.log('Stage 1: '+bottom+'-'+top)
    while(balls>1){
        
        test_floor=Math.round((top-bottom)*options.fraction)
        if(test_floor==0) test_floor=1
        test_floor+=bottom
        
        if(bottom>=options.floors) throw null // Достигли верха диапазона на 1 этапе

        // Кидаем шар (бьётся или нет?)
        if(verbose) console.log('Кидаем шар, этаж', test_floor)
        this.steps++
        if(test_floor>options.last_good_floor){
            balls--
            if(verbose) console.log('Шар разбился')
            top=test_floor-1
        }else{
            bottom=test_floor
        }
    }
    
    if(verbose) console.log('Stage 2: '+bottom+'-'+top)
    
    // Stage 2 - у нас последний стеклянный шар
    while(balls>0){
        // Тестируем нижнюю границу, если шар цел, границу поднимаем
        if(bottom==top){
            this.result=bottom
            if(verbose) console.log('Прерываем без броска, итак понятно, этаж '+this.result)
            //this.steps--
            throw null // Прерываем исполнение
        }

        // Кидаем шар (бьётся или нет?)
        this.steps++
        if(verbose) console.log('Кидаем шар, этаж', bottom)
        if(bottom>options.last_good_floor){
            balls--
            this.result=bottom-1
            if(verbose) console.log('Шар разбился')
        }else{
            bottom++
        }
    }
    
    if(this.result!=options.last_good_floor) { this.correct=false; this.reason='Incorrect result' }
    } catch(obj){
        
    }
    if(verbose) console.log('Результат', this.result, "этаж")
 }
 
 /**
 * Процесс
 */
 let i, frac, res, options, max_steps, effective_frac, effective_steps=null, effective_res=null
 options=Object.assign({},defaultOptions)

 
 // Ищем самую эффективную дробь (фракцию) для деления
 frac=0.99
 effective_frac=frac
 while(frac>0 && frac<1){
    options.fraction=frac
    //console.log('fraction', options.fraction)
    
  
     // Ищем максимум итераций всех вариантов этажей
     max_steps=0, max_res=null
     for(i=1; i<options.floors; i++){
        options.last_good_floor=i
        res=new lastFloor(options)
        if(!res.correct) console.log(res, res.correct)
        
        
        if((res.steps>max_steps) && res.correct==true){
            max_steps=res.steps
            max_res=res
        }
     }
     //console.log('max_steps:', max_steps)
     if(effective_steps==null || max_steps<effective_steps){
         effective_steps=max_steps
         effective_frac=frac
         effective_res=max_res
     }

    frac-=0.001
 }
 
console.log('effective_frac', effective_frac)
console.log('effective_steps', effective_steps)
console.log('effective_res', effective_res)

console.log('=========================================7')
console.log('Прогон опции с самым эффективным делением|')
console.log('но с максимальным количеством шагов      |')
options=Object.assign({},effective_res.options)
res=new lastFloor(options,true)
 
  
