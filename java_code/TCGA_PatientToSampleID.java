import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;

import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import org.xml.sax.SAXException;


public class TCGA_PatientToSampleID {
	
	public void Process(){
		
		
		File folder = new File("./data/");
		File[] fileList = folder.listFiles();
		String dir;
		
		for (File file: fileList){
			
			
			FileWriter file_out = null;
			
			try {
				file_out = new FileWriter(file.toString().substring(7,file.toString().length()).concat("_barcodes"));
			} catch (IOException e1) {
				// TODO Auto-generated catch block
				e1.printStackTrace();
			}
			
			dir = file.toString().concat("/rppa");
			System.out.println(dir);
			folder = new File(dir);
			File[] fileList2 = folder.listFiles();
			
			for (File file2: fileList2){
				System.out.println("\t"+file2.toString());
				String patternStr = ".*(........-....-....-....-............).txt$";
				Pattern p = Pattern.compile(patternStr);
				Matcher m = p.matcher(file2.toString());
				if (m.matches()) {
					String id = m.group(1);
			        System.out.println("\t"+id);
			        
			        String url = "https://tcga-data.nci.nih.gov/uuid/uuidws/metadata/xml/uuid/";
					url = url.concat(id);
					System.out.println("\t"+url);

			        DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();
					DocumentBuilder db;
					try {
						db = dbf.newDocumentBuilder();
						Document doc = db.parse(new URL(url).openStream());
						NodeList nList = doc.getElementsByTagName("barcodes");
						Node nNode = nList.item(0);
						Element eElement = (Element) nNode;
						String barcode = eElement.getElementsByTagName("barcode").item(0).getTextContent();
						System.out.println("\tBarcode: " + barcode);
						System.out.println("\t-->: "+barcode.substring(0, 12));
						
						file_out.write(id+"\t"+barcode+"\n");
						
						//System.out.println("\tnationwidechildrens.org_clinical_patient_".concat(file.toString().substring(7,file.toString().length())).concat(".txt"));
						
					} catch (ParserConfigurationException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					} catch (MalformedURLException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					} catch (SAXException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					} catch (IOException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}
					
			    }
				else{
					System.out.println("not found");
				}
				
			}
			
			try {
				file_out.close();
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			
		}
		
		
	}
	
	

}
