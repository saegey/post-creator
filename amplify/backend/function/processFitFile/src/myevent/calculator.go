package myevent

import (
	"fmt"
	"math"
	"sort"
	"time"

	"github.com/tormoder/fit"
)

func CalcNormalizedPower(powers []uint16) float32 {
	fmt.Println("Calculating normalized power")
	segmentSums := make([]float64, 0)
	cleanPowers := make([]float64, len(powers))
	for i, p := range powers {
		if p == 0 {
			cleanPowers[i] = 0
		} else {
			cleanPowers[i] = float64(p)
		}
	}

	index := 0
	for index <= len(powers)-30 {
		segmentSum := 0.0
		for _, p := range cleanPowers[index : index+30] {
			segmentSum += p
		}
		segmentSums = append(segmentSums, segmentSum)
		index += 1
	}

	segmentTotal := 0.0
	for _, s := range segmentSums {
		segmentTotal += math.Pow(s/30, 4)
	}

	// fmt.Printf("Segment Total: %.2f\n", segmentTotal)

	average := segmentTotal / float64(len(segmentSums))
	return float32(math.Pow(average, 1.0/4.0))
}

func CalcBestPowers(times []int, powers []uint16, removeZeros bool) map[string]uint16 {
	filteredVals := make([]uint16, 0)
	if removeZeros {
		for _, val := range powers {
			if val != 0 {
				filteredVals = append(filteredVals, val)
			}
		}
	} else {
		filteredVals = powers
	}

	sum := uint64(0)
	for _, p := range filteredVals {
		sum += uint64(p)
	}
	averagePower := math.Round(float64(sum) / float64(len(filteredVals)))

	response := make(map[string]uint16)
	response["entire"] = uint16(averagePower)

	for _, time := range times {
		if time > len(filteredVals) {
			continue
		}
		powerSlices := calcPowerSlices(filteredVals, time)
		response[fmt.Sprintf("%d", time)] = uint16(float64(powerSlices[len(powerSlices)-1]) / float64(time))
	}

	return response
}

func calcPowerSlices(powers []uint16, length int) []float64 {
	powerSums := make([]float64, 0)
	for i := 0; i <= len(powers)-length; i++ {
		nums := powers[i : i+length]
		if len(nums) == length {
			sum := float64(0)
			for _, num := range nums {
				sum += float64(num)
			}
			powerSums = append(powerSums, float64(sum))
		}
	}
	sort.Float64s(powerSums)
	return powerSums
}

func isFinite(f float64) bool {
	return !math.IsInf(f, 0) && !math.IsNaN(f)
}

func CalcElevationGrades(coordinates [][]float64, distances []float32, elevations []float64) []float64 {
	grades := make([]float64, len(coordinates))
	for index := range coordinates {
		grade := 0.0
		if !math.IsNaN(grade) && isFinite(grade) {
			if index > 30 && index-30 < len(coordinates) {
				grade = float64(elevations[index]-elevations[index-30]) / float64(distances[index]-distances[index-30])
			}

			if !math.IsNaN(grade) && isFinite(grade) {
				grades[index] = math.Round(grade*1000) / 1000
			} else {
				grades[index] = 0
			}
		}
	}
	return grades
}

func GetMaxAveragePowerForInterval(records []*fit.RecordMsg, interval time.Duration) float64 {
	maxAverage := 0.0
	start := 0
	windowSum := uint64(0)

	for end := 0; end < len(records); end++ {
		// Move the start index up to maintain the interval window
		for records[end].Timestamp.Sub(records[start].Timestamp) > interval {
			windowSum -= uint64(records[start].Power)
			start++
		}
		// Add the current record's power to the window sum
		windowSum += uint64(records[end].Power)
		// Calculate the average for the current window
		currentWindowLength := end - start + 1
		average := float64(windowSum) / float64(currentWindowLength)
		if average > maxAverage {
			maxAverage = average
		}
	}

	return maxAverage
}
