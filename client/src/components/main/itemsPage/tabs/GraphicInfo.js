import * as React from "react";
import Tabs from "@mui/joy/Tabs";
import TabList from "@mui/joy/TabList";
import Tab from "@mui/joy/Tab";
import TabPanel from "@mui/joy/TabPanel";
import Grid from "@mui/material/Grid";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import sewn_finishing_1 from "../../../../Resources/FinishingStyles/sewn_finishing_1.jpg";
import sewn_finishing_2 from "../../../../Resources/FinishingStyles/sewn_finishing_1.jpg";
import Vinyl_finishing_1 from "../../../../Resources/FinishingStyles/Vinyl_finishing_1.jpg";
import Vinyl_finishing_2 from "../../../../Resources/FinishingStyles/Vinyl_finishing_2.jpg";
import welded_vinyl_1 from "../../../../Resources/FinishingStyles/welded_vinyl_1.jpg";
import welded_vinyl_2 from "../../../../Resources/FinishingStyles/welded_vinyl_2.jpg";

function GraphicInfo({ finishingStyle, category }) {
  const [value, setValue] = React.useState(0);

  // console.log(finishingStyle);

  const handleFinishingStyle = () => {
    if (finishingStyle === "Banners - Vinyl") {
      return (
        <>
          <img src={Vinyl_finishing_1} alt="Vinyl Finishing 1" />
          <img src={Vinyl_finishing_2} alt="Vinyl Finishing 2" />
          <img src={welded_vinyl_1} alt="Welded Vinyl 1" />
          <img src={welded_vinyl_2} alt="Welded Vinyl 2" />
        </>
      );
    } else if (
      finishingStyle === "Banners - Fabric" ||
      finishingStyle === "Fence Banners"
    ) {
      return (
        <>
          <img src={sewn_finishing_1} alt="Sewn Finishing 1" />
          <img src={sewn_finishing_2} alt="Sewn Finishing 2" />
        </>
      );
    } else {
      return "No Finishing Styles needed";
    }
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <Grid>
        <Tabs
          aria-label="Basic tabs"
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
        >
          <TabList>
            <Tab>General Graphics</Tab>
            <Tab>Customer Tips</Tab>
            <Tab>Dropbox Tips</Tab>
            <Tab>Letter Visibility Guide</Tab>
            <Tab>QR Code Tips</Tab>
            <Tab>Finishing Styles</Tab>
          </TabList>
          <TabPanel value={0}>
            <h1>General Graphic Info</h1>
            <h4>creativeservices@showdowndisplays.com</h4>
            <h2>GuideLines: </h2>
            <ul>
              <li>Design time prices at $60(G) per 30 minutes.</li>
              <li>
                Services include:
                <ul>
                  <li>Design and layout</li>
                  <li>Production-ready art creation</li>
                  <li>Logo re-creation</li>
                  <li>Virtual sample requests exceeding 3 products</li>
                </ul>
              </li>
              <li>Design time is not available for Quick Ship products.</li>
              <li>Design time is only available for our product line.</li>
            </ul>
            <h2>How to Get Started</h2>
            <ul>
              <li>
                Customer should E-mail us a request for a quote with project
                details and contact information.
              </li>
              <li>
                Customer should receive your quote within 1 business day of your
                request.
              </li>
              <li>
                Creation of art will begin upon receipt of: PO including design
                time, approved design time quote and payment/credit approval.
              </li>
              <li>
                Projects extending beyond quoted design time due to customer
                revisions will require the purchase of additional design time.
                Customer will be contacted by Creative Services to make the
                adjustment to your order.
              </li>
            </ul>
            <h2>Virtual</h2>
            <ul>
              <li>
                A virtual sample is a customers logo or completed artwork
                applied to a product image.
              </li>
              <li>See Sharepoint for Virtual design Time</li>
              <li>
                Free service is limited to 1-3 products regardless of product
                quantity
              </li>
            </ul>
            <h3>Restrictions</h3>
            <ul>
              <li>
                Virtual samples are not offered for Quick Ship products due to
                program restrictions.
              </li>
              <li>
                Virtual Samples are not to be used for proofing and are for
                rough visual reference only.
              </li>
              <li>
                Art creation, design, or layout will require the purchase of
                design time
              </li>
            </ul>
            <h3>How Customers should place orders</h3>
            <ul>
              <li>Submit purchase order to orders@showdowndisplays.com</li>
              <li>
                Customer should note the virtual reference number on purchase
                order.
              </li>
            </ul>
          </TabPanel>
          <TabPanel value={1}>
            <h1>Helpful Tips for Customers</h1>
            <ol>
              <li>remember to outline your fonts and embed your images</li>
              <li>Artwork file size can be a max of 2 GB per file</li>
              <li>
                Accepted file types are high resolution files such as:
                <ul>
                  <li>jpeg</li>
                  <li>jpg</li>
                  <li>ai</li>
                  <li>pdf</li>
                  <li>eps</li>
                  <li>tif</li>
                  <li>tiff</li>
                </ul>
              </li>
            </ol>
          </TabPanel>
          <TabPanel value={2}>
            <h1>Share a Link</h1>
            <ol>
              <li>Sign in to dropbox.com</li>
              <li>
                Hover your cursor over the file or folder you’d like to share
                and click Share when it appears.
              </li>
              <li>
                If a link hasn’t been created, click Create a Link. * If a link
                was already created, click Copy Link.
              </li>
              <li>
                The link will be copied to your clipboard. You can then paste it
                to an email, message, or wherever people can access it.
              </li>
            </ol>
          </TabPanel>
          <TabPanel value={3}>
            <TableContainer component={Paper}>
              <h4>Tips</h4>
              <p>
                Printing light text on a dark background will require
                larger/thicker text.
              </p>
              <p>
                Very small text on fabric or nylon products may not print clear
                (under approximately 1” high or .5pt stroke)
              </p>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <h2>Letter Height</h2>
                  </TableCell>
                  <TableCell>
                    <h2>Distance for Best Impact</h2>
                  </TableCell>
                  <TableCell>
                    <h2>Max Readable Distance</h2>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>3"</TableCell>
                  <TableCell>30'</TableCell>
                  <TableCell>100'</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>4"</TableCell>
                  <TableCell>40'</TableCell>
                  <TableCell>150'</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>6"</TableCell>
                  <TableCell>60'</TableCell>
                  <TableCell>200'</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>8"</TableCell>
                  <TableCell>80'</TableCell>
                  <TableCell>350'</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>9"</TableCell>
                  <TableCell>90'</TableCell>
                  <TableCell>400'</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>10"</TableCell>
                  <TableCell>100'</TableCell>
                  <TableCell>450'</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>12"</TableCell>
                  <TableCell>120'</TableCell>
                  <TableCell>525'</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>15"</TableCell>
                  <TableCell>150'</TableCell>
                  <TableCell>630'</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>18"</TableCell>
                  <TableCell>180'</TableCell>
                  <TableCell>750'</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>24"</TableCell>
                  <TableCell>240'</TableCell>
                  <TableCell>1000'</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>30"</TableCell>
                  <TableCell>300'</TableCell>
                  <TableCell>1250'</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>36"</TableCell>
                  <TableCell>360'</TableCell>
                  <TableCell>1500'</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>42"</TableCell>
                  <TableCell>420'</TableCell>
                  <TableCell>1750'</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>48"</TableCell>
                  <TableCell>480'</TableCell>
                  <TableCell>2000'</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>54"</TableCell>
                  <TableCell>540'</TableCell>
                  <TableCell>2250'</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>60"</TableCell>
                  <TableCell>600'</TableCell>
                  <TableCell>2500'</TableCell>
                </TableRow>
              </TableBody>
            </TableContainer>
          </TabPanel>
          <TabPanel value={4}>
            <h2>
              Generally a 10:1 ratio can be used to judge the scanning distance
              of a QR code
            </h2>
            <ul>
              <h3>Other Tips</h3>
              <li>
                High quality or vector QR codes are recommended; pixelated or
                blurry codes may not scan correctly
              </li>
              <li>
                High contrast between the QR code and background color will make
                it easier to scan
              </li>
              <li>
                Larger QR codes will by easier to scan from a distance. Fabric
                products may require slightly larger QR codes than smooth
                surface products
              </li>
              <li>Test strips are reccomended to test your printed QR c</li>
            </ul>
            <TableContainer>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <h2>QR Size Range *inches*</h2>
                  </TableCell>
                  <TableCell>
                    <h2>Approximate Scanning Distance *feet/inches*</h2>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>1"</TableCell>
                  <TableCell>10"</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>2"</TableCell>
                  <TableCell>1' 8"</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>3"</TableCell>
                  <TableCell>2' 5"</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>4"</TableCell>
                  <TableCell>3' 3"</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>5"</TableCell>
                  <TableCell>4' 2"</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>6"</TableCell>
                  <TableCell>5'</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>8"</TableCell>
                  <TableCell>6' 7"</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>10"</TableCell>
                  <TableCell>8' 3"</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>12</TableCell>
                  <TableCell>10'</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>15"</TableCell>
                  <TableCell>12' 5"</TableCell>
                </TableRow>
              </TableBody>
            </TableContainer>
          </TabPanel>
          <TabPanel value={5}>{handleFinishingStyle()}</TabPanel>
        </Tabs>
      </Grid>
    </>
  );
}

export default GraphicInfo;
