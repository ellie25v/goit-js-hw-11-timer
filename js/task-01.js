'use strict';

class CountdownTimer {
    constructor(obj) {
        this.selector = obj.selector;
        this.targetDate = obj.targetDate;
        this.startTimer()
    }
    getSeconds () {
        return Math.floor(
            ((this.time) % (1000 * 60 )) / (1000)
        );
    };

    getMinutes () {
        return Math.floor(
            ((this.time) % (1000 * 60 * 60)) / (1000 * 60)
        );
    };
    
    getHours () {
        return Math.floor(
            ((this.time) % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
    };
    
    getDays () {
        return Math.floor((this.time) / (1000 * 60 * 60 * 24));
    };

    getNumbers () {
        this.time = this.targetDate.getTime() - Date.now()
        let date = new Date();
        let secs = this.getSeconds(date);
        let minutes = this.getMinutes(date);
        let hours = this.getHours(date);
        let days = this.getDays(date);
        return {secs, minutes, hours, days}
    }

    getValues () {
        
        let numbers = this.getNumbers();
        let secsPlace = numbers.secs < 10 ? `0${numbers.secs}` : `${numbers.secs}`;
        let minutesPlace = numbers.minutes < 10 ? `0${numbers.minutes}` : `${numbers.minutes}`;
        let hoursPlace = numbers.hours < 10 ? `0${numbers.hours}` : `${numbers.hours}`;
        let n1 = this.time.toString().length;
        let n2 = numbers.days.length;
        let daysPlace = `${'0'.repeat(n1-n2)}${numbers.days}`;

        return {secsPlace, minutesPlace, hoursPlace, daysPlace}
    }

    reflectTime () {
        let numbers = this.getNumbers();
        let values = this.getValues();
        console.log(values)
        
        document.querySelector(`${this.selector} span[data-value="secs"]`).textContent = values.secsPlace;
        document.querySelector(`${this.selector} span[data-value="minutes"]`).textContent = values.minutesPlace;
        document.querySelector(`${this.selector} span[data-value="hours"]`).textContent = values.hoursPlace;
        document.querySelector(`${this.selector} span[data-value="days"]`).textContent = values.daysPlace;

    
        if (numbers.secs===0 && numbers.minutes===0 && numbers.hours===0 && numbers.days===0) {
            clearInterval(this.timerId);
        }
    };

    startTimer () {
        this.timerId = setInterval(this.reflectTime.bind(this), 1000);
    }
}

const timer1 = new CountdownTimer({
    selector: '#timer-1',
    targetDate: new Date('Jul 17, 2021'),
});

