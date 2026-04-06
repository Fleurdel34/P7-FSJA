import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
    export class LoggingService {
        constructor(private http: HttpClient) {}

        log(level: string, message: string) {
        const log = {
            level,
            message,
            timestamp: new Date().toISOString(),
            source: 'frontend'
        };

        this.http.post('http://logstash:5045', log).subscribe();
    }
    
    info(msg: string) { this.log('INFO', msg); }
    warn(msg: string) { this.log('WARN', msg); }
    error(msg: string) { this.log('ERROR', msg); }
}
