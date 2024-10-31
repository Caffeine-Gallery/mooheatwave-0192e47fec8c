import Array "mo:base/Array";
import Debug "mo:base/Debug";
import Float "mo:base/Float";
import Text "mo:base/Text";
import Nat "mo:base/Nat";
import Buffer "mo:base/Buffer";

actor {
    // Define the farm location type
    public type FarmLocation = {
        latitude: Float;
        longitude: Float;
    };

    // Stable variable to store farm data
    stable var farmLocations : [FarmLocation] = [];

    // Initialize with some sample data
    private func initializeSampleData() : [FarmLocation] {
        // Sample dairy farm locations (this would normally come from an API)
        let samples = [
            { latitude = 42.7325; longitude = -73.6927 },  // New York
            { latitude = 44.5588; longitude = -89.6301 },  // Wisconsin
            { latitude = 36.7783; longitude = -119.4179 }, // California
            { latitude = 44.9375; longitude = -93.2010 },  // Minnesota
            { latitude = 41.8780; longitude = -93.0977 },  // Iowa
            { latitude = 39.8283; longitude = -98.5795 },  // Kansas
            { latitude = 40.7128; longitude = -74.0060 },  // New York City
            { latitude = 34.0522; longitude = -118.2437 }, // Los Angeles
            { latitude = 41.8781; longitude = -87.6298 },  // Chicago
            { latitude = 29.7604; longitude = -95.3698 }   // Houston
        ];
        samples
    };

    // Public query function to get dairy farm locations
    public query func getDairyFarms() : async [FarmLocation] {
        if (farmLocations.size() == 0) {
            // If no data exists, return sample data
            return initializeSampleData();
        };
        farmLocations
    };

    // System functions for upgrade persistence
    system func preupgrade() {
        // Data is already in stable storage
    };

    system func postupgrade() {
        // Initialize if empty
        if (farmLocations.size() == 0) {
            farmLocations := initializeSampleData();
        };
    };
}
