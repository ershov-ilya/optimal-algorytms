﻿let defaultOptions = {
    floors: 100,
    balls: 2,
    fraction: 0.5,
    last_good_floor: 70
}

 /**
 * Рабочая функция расчёта
 * Конструктор представляет собой вычислительный процесс
 * Объект создаваемый конструтором будет содержать результат расчёта
 */ 
 function findFloor(options, DEBUG=false){
    this.steps=0
    this.corret=true
    this.result=false
    this.reason=''
    this.options=options
    
    // Проверка валидности параметров
    if(options.last_good_floor>options.floors) { this.corret=false; this.reason='Incorrect last_good_floor' }
    if(options.fraction<=0 || options.fraction>=1) { this.corret=false; this.reason='Incorrect fraction' }
    if(options.floors<1) { this.corret=false; this.reason='Incorrect floors count' }
    if(this.corret==false) return this
    
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
        if(bottom>=options.floors) return this // Достигли верха диапазона на 1 этапе
    }
    
    if(DEBUG) console.log('Stage 2:', bottom, top)
    
    // Stage 2 - у нас последний стеклянный шар
    while(balls>0){
        this.steps++
        if(DEBUG) console.log('test_floor', bottom)
        // Тестируем нижнюю границу, если шар цел, границу поднимаем
        // Кидаем шар (бьётся или нет?)
        if(bottom>options.last_good_floor){
            balls--
            this.result=bottom-1
            if(DEBUG) console.log('Разбился шар')
        }else{
            bottom++
        }
    }
    
    if(this.result!=options.last_good_floor) { this.corret=false; this.reason='Incorrect result' }
 }
 
 /**
 * Процесс
 */
 let res=new findFloor(defaultOptions)
 console.log(res)