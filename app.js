// class that represents a point with location, speed, and timeDuration properties
class Point {
  constructor(latitude, longitude, speed, timeDuration) {
    this.latitude = latitude;
    this.longitude = longitude;
    this.speed = speed;
    this.timeDuration = timeDuration;
  }
}

// This is a constant for the radius of the earth from 6367km to 3958 in miles
const EARTH_RADIUS = 3958.8;

// function that converts degrees to radians
function toRadians(degrees) {
  return (degrees * Math.PI) / 180;
}

function calculateDistance(pointA, pointB) {
  // Convert the latitudes and longitudes to radians
  let latA = toRadians(pointA.latitude);
  let latB = toRadians(pointB.latitude);
  let lonA = toRadians(pointA.longitude);
  let lonB = toRadians(pointB.longitude);

  // Calculate the differences between the latitudes and longitudes
  let dLat = latB - latA;
  let dLon = lonB - lonA;

  // Calculate the Haversine formula
  let a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(latA) * Math.cos(latB) * Math.sin(dLon / 2) ** 2;
  let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  let d = EARTH_RADIUS * c;

  // The intermediate result c is the great circle distance in radians
  // The great circle distance d will be in the same units as R.
  // Return the distance in miles
  return d;
}

// this function calculates the expected time to go from one point to another in minutes using speed and distance
function calculateExpectedTime(pointA, pointB) {
  // Calculate the distance between the points
  let distance = calculateDistance(pointA, pointB);

  // Calculate the expected time using speed and distance
  let expectedTime = (distance / pointA.speed) * 60;
  return expectedTime;
}

// Define a function that takes two points as parameters and returns true if there is an impenetrable obstruction between them, false otherwise
function checkObstruction(pointA, pointB) {
  // Calculate the expected time to go from one point to another
  let expectedTime = calculateExpectedTime(pointA, pointB);
  // If the result exceeds the expected time by more than 60 minutes, there is an impenetrable obstruction
  if (pointB.timeDuration - expectedTime > 60) {
    return true;
  } else {
    return false;
  }
}
