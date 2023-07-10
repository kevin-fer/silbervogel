export class CreateVolDto {
  flightNumber: string;
  operatingAirlineCode: string;
  departureCity: string;
  arrivalCity: string;
  departureAirportCode: string;
  arrivalAirportCode: string;
  departureDate: string;
  duration: number;
  aircraftId: string;
  passengers: number;
  pilotId: string;
  refreshToken?: string;
}
