// import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { lambda_layer_kubectl, Stack, StackProps } from 'aws-cdk-lib';
import { aws_eks as eks } from 'aws-cdk-lib';
import { aws_ec2 as ec2 } from 'aws-cdk-lib';
import { KubectlLayer } from 'aws-cdk-lib/lambda-layer-kubectl';

export class EksTestStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const eksCluster = new eks.Cluster(this, 'BC-EKS', {
      version: eks.KubernetesVersion.V1_21,
      // kubectlLayer: new KubectlV24Layer(this, 'kubectl')
    })

    const nodeGroup = new eks.Nodegroup(this, "NodeGroup1", {
      cluster: eksCluster,
      capacityType: eks.CapacityType.SPOT,
      desiredSize: 1,
      maxSize: 3,
      minSize: 1,
      amiType: eks.NodegroupAmiType.AL2_X86_64
    })
    }
}
