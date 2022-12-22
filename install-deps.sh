#!/bin/bash
echo "Installing dependencies"
npm --prefix ./auth-service ci ./auth-service
npm --prefix ./product-service ci ./product-service
npm --prefix ./shopping-client ci ./shopping-client
npm --prefix ./store-service ci ./store-service
echo "Installation is completed"