

import { src, dest } from 'gulp'
import * as rename from 'gulp-rename'

import { myPlugin } from '../src/plugin';
const errorHandler = require('gulp-error-handle'); // handle all errors in one handler, but still stop the stream if there are errors;

export function processCsv(callback: any) {
    try {    
        return src(['../testdata/*.ndjson'],{buffer: true})
        .pipe(errorHandler(function(err:any) {
            console.error('oops: ' + err)
            callback(err)
          }))        
        .on('data', function (file:any) {
            console.log('TypeScript: Starting processing on ' + file.basename)
        })  
        .pipe(myPlugin()) 

        .pipe(rename({suffix:"-discounted", extname: ".ndjson" })) // rename to *.ndjson
        .on('data', function (file:any) {
            console.log('Done processing on ' + file.basename)
        })  
        .pipe(dest('../testdata/processed'));
    }
    catch (err) {
        console.error(err)    
    }}
    

   