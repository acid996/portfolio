import AppKit
import CoreImage
import Foundation
import Vision

enum PortraitExtractionError: Error {
  case failedToLoadImage
  case failedToCreateMask
  case failedToComposite
}

let arguments = CommandLine.arguments

guard arguments.count >= 3 else {
  fputs("Usage: swift extract-portrait.swift <input> <output>\n", stderr)
  exit(1)
}

let inputURL = URL(fileURLWithPath: arguments[1])
let outputURL = URL(fileURLWithPath: arguments[2])

guard let sourceImage = CIImage(contentsOf: inputURL) else {
  throw PortraitExtractionError.failedToLoadImage
}

let request = VNGeneratePersonSegmentationRequest()
request.qualityLevel = .accurate
request.outputPixelFormat = kCVPixelFormatType_OneComponent8

let handler = VNImageRequestHandler(ciImage: sourceImage, options: [:])
try handler.perform([request])

guard
  let observation = request.results?.first as? VNPixelBufferObservation
else {
  throw PortraitExtractionError.failedToCreateMask
}

let maskImage = CIImage(cvPixelBuffer: observation.pixelBuffer)
let scaledMask = maskImage
  .transformed(
    by: CGAffineTransform(
      scaleX: sourceImage.extent.width / maskImage.extent.width,
      y: sourceImage.extent.height / maskImage.extent.height
    )
  )
  .cropped(to: sourceImage.extent)

let transparentBackground = CIImage(color: .clear).cropped(to: sourceImage.extent)

guard
  let blendFilter = CIFilter(
    name: "CIBlendWithMask",
    parameters: [
      kCIInputImageKey: sourceImage,
      kCIInputBackgroundImageKey: transparentBackground,
      kCIInputMaskImageKey: scaledMask
    ]
  ),
  let outputImage = blendFilter.outputImage
else {
  throw PortraitExtractionError.failedToComposite
}

let context = CIContext(options: nil)
let colorSpace = CGColorSpaceCreateDeviceRGB()

try context.writePNGRepresentation(
  of: outputImage,
  to: outputURL,
  format: .RGBA8,
  colorSpace: colorSpace
)

