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
 function findFloor(options, DEBUG=false){
    this.steps=0
    this.correct=true
    this.result=false
    this.reason=''
    this.options=options
    
    try{
    
    // Проверка валидности параметров
    if(options.last_good_floor>options.floors) { this.correct=false; this.reason='Incorrect last_good_floor' }
    if(options.fraction<=0 || options.fraction>=1) { this.correct=false; this.reason='Incorrect fraction' }
    if(options.floors<1) { this.correct=false; this.reason='Incorrect floors count' }
    if(this.correct==false) throw null
    
    // Stage 1 - у нас есть запасные стеклянные шары
    let balls=this.options.balls, bottom=1, top=options.floors, test_floor
    while(balls>1){
        this.steps++
        
        test_floor=Math.floor((top-bottom)*options.fraction)
        if(test_floor==0) test_floor=1
        test_floor+=bottom
        if(DEBUG) console.log('test_floor', test_floor)
        
        // Кидаем шар (бьётся или нет?)
        if(test_floor>options.last_good_floor){
            balls--
            if(DEBUG) console.log('Разбился шар')
            top=test_floor-1
        }else{
            bottom=test_floor
        }
        if(bottom>=options.floors) throw null // Достигли верха диапазона на 1 этапе
    }
    
    if(DEBUG) console.log('Stage 2: '+bottom+'-'+top)
    
    // Stage 2 - у нас последний стеклянный шар
    while(balls>0){
        this.steps++
        if(DEBUG) console.log('test_floor', bottom)
        // Тестируем нижнюю границу, если шар цел, границу поднимаем
        if(bottom==top){
            this.result=bottom
            throw null // Прерываем исполнение
        }
        // Кидаем шар (бьётся или нет?)
        if(bottom>options.last_good_floor){
            balls--
            this.result=bottom-1
            if(DEBUG) console.log('Разбился шар')
        }else{
            bottom++
        }
    }
    
    if(this.result!=options.last_good_floor) { this.correct=false; this.reason='Incorrect result' }
    } catch(obj){
        
    }
    
 }
 
 /**
 * Процесс
 */
 let i, frac, res, options, max_steps, effective_frac, effective_steps=null
 options=Object.assign({},defaultOptions)

 
 // Ищем самую эффективную дробь (фракцию) для деления
 frac=0.99
 effective_frac=frac
 while(frac>0 && frac<1){
    options.fraction=frac
    //console.log('fraction', options.fraction)
    
  
     // Считаем максимум итераций  всех вариантов этажей
     max_steps=0, max_res=null
     for(i=1; i<options.floors; i++){
        options.last_good_floor=i
        res=new findFloor(options)
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
     }

    frac-=0.001
 }
 
console.log('effective_frac', effective_frac)
console.log('effective_steps', effective_steps)

 /*
  options=Object.assign({},defaultOptions)
  options.last_good_floor=49
  res=new findFloor(options,true)
 */
  
