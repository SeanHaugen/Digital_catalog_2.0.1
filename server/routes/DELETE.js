const express = require("express");
const router = express.Router();

router.delete("/delete/:itemNumber", async (req, res) => {
  try {
    let itemToDelete = req.params.itemNumber;

    await items.findOneAndDelete({ Item_Number: itemToDelete });

    if (!deletedItem) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.sendStatus(201);
  } catch (error) {
    console.error("Error deleting item:", error);
    res.status(500).json({ message: "Could not delete item", error });
  }
});

// app.delete("/delete/pricing/:itemNumber", async (req, res) => {
//   try {
//     let priceToDelete = req.params.itemNumber;
//     let elementToDelete = req.body.elementToDelete;

//     await PricingModel.updateOne(
//       { Item_Number: priceToDelete },
//       {
//         $pull: {
//           pricing: elementToDelete,
//         },
//       }
//     );

//     res.sendStatus(201);
//   } catch (error) {
//     console.error("Error deleting item", error);
//     restart.status(500).json({ message: "could not delete item", error });
//   }
// });

module.exports = router;
