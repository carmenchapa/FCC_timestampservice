# API Basejump: Timestamp microservice
### By Carmen Chapa


User stories:

+ I can pass a string as a parameter, and it will check to see whether that string contains either a unix timestamp or a natural language date (example: January 1, 2016)
+ If it does, it returns both the Unix timestamp and the natural language form of that date.
+ If it does not contain a date or Unix timestamp, it returns null for those properties.

## Example Usage:

```
https://carmenchapa-fcc-timestamp.glitch.me/December%2015,%202015 

https://carmenchapa-fcc-timestamp.glitch.me/1450137600 
```

## Example Output:

```
{ unix: 1450137600000, natural: "December 15, 2015" }
```